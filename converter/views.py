from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from . import models, serializers, utils

import logging

logger = logging.getLogger(__name__)


class Synthesize(APIView):
    """
    Synthesize text to audio recording for particular user
    """

    def get(self, request):
        """
        :return: Notification List object
        """
        voice = request.query_params.get('voice', 'en-US_MichaelVoice')
        accept = request.query_params.get('accept', 'audio/ogg; codecs=opus')
        text = request.query_params.get('text', '')
        download = request.args.get('download', '')

	    headers = {}

	    if download:
	        headers['content-disposition'] = 'attachment; filename=transcript.ogg'

	    try:
	    	textToSpeech = models.Audio()
	        req = textToSpeech.synthesize(text, voice, accept)
	        return Response(req.iter_content(),
	            headers=headers, content_type = req.headers['content-type'])
	    except Exception,e:
	        logger.error(e)
