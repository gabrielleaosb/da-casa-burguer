from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('menu.urls')),
]

if settings.DEBUG:
    # Serve os arquivos de mídia (imagens, vídeos, uploads)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

    # Serve os arquivos estáticos (CSS, JS, etc.)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)