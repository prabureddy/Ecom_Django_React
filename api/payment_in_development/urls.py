from django.urls import path, include
from . import views

urlpatterns = [
    path('pay/<str:id>/<str:token>/',
         views.initiate_payment, name="pay"),
    path('callback/<str:id>/<str:token>/',
         views.process_payment, name="callback"),
]
