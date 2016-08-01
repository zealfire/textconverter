from django.db import models
from django.conf import settings

from audiofield.fields import AudioField

import os.path


class Audio(ModelBase):
    """
    table to store otp related information
    """
    voice = models.CharField(max_length=254)
    text = models.CharField(max_length=254)

    audio_file = AudioField(upload_to='your/upload/dir', blank=True,
                        ext_whitelist=(".mp3", ".wav", ".ogg"),
                        help_text=("Allowed type - .mp3, .wav, .ogg"))

	# Add this method to your model
	def audio_file_player(self):
	    """audio player tag for admin"""
	    if self.audio_file:
	        file_url = settings.MEDIA_URL + str(self.audio_file)
	        player_string = '<ul class="playlist"><li style="width:250px;">\
	        <a href="%s">%s</a></li></ul>' % (file_url, os.path.basename(self.audio_file.name))
	        return player_string

	audio_file_player.allow_tags = True
	audio_file_player.short_description = ('Audio file player')