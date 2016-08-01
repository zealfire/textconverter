from django.conf.urls import url, include

from converter import views

urlpatterns = [
    url(r'^synthesize/', views.Synthesize.as_view(), name='synthesize'),
]
