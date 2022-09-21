from .settings import *


DEBUG = True
ALLOWED_HOSTS = ['*']
CSRF_TRUSTED_ORIGINS = ['https://djong-grupo5.herokuapp.com']

# Database
# https://docs.djangoproject.com/en/4.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'd9103a4oq60kjh',
        'USER': 'awittcucbathjj',
        'PASSWORD': '3de421d060b706a184b83cb64ce19ffbf5f2a2685c682140f5dcfc3251f87395',
        'HOST': 'ec2-44-206-197-71.compute-1.amazonaws.com',
        'PORT': '5432',
    }
}

SITE_ID = 6

LOGIN_REDIRECT_URL = '/'
LOGOUT_REDIRECT_URL = '/'
SOCIALACCOUNT_LOGIN_ON_GET=True

# SOCIALACCOUNT_PROVIDERS = {
#     'google': {
#         # For each OAuth based provider, either add a ``SocialApp``
#         # (``socialaccount`` app) containing the required client
#         # credentials, or list them here:
#         'APP': {
#             'client_id': '123',
#             'secret': '456',
#             'key': ''
#         }
#     }
# }

# CONFIGURACION DE EMAIL
EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = "smtp.gmail.com"
EMAIL_USE_TLS = True
EMAIL_PORT = 587
EMAIL_HOST_USER = "odecmachagai@gmail.com"
EMAIL_HOST_PASSWORD = "vrryknfqqqhwvnif"
# https://accounts.google.com/b/0/DisplayUnlockCaptcha
 
import django_heroku
django_heroku.settings(locals())
