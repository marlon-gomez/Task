from django.urls import path, include
from rest_framework import routers
from rest_framework.documentation import include_docs_urls
from tasks import views
from django.urls import re_path
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

router = routers.DefaultRouter()
router.register(r'tasks', views.TaskView, 'tasks')

# api versioning
urlpatterns = [ 
    path('api/v1/', include(router.urls)),
    path('docs/', include_docs_urls(title='Task Api'))
]

schema_view = get_schema_view(
   openapi.Info(
      title="Snippets API",
      default_version='v1',
      description="Test description",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="contact@snippets.local"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

URL_PATTERNS = [
   path('swagger<format>/', schema_view.without_ui(cache_timeout=0), name='schema-json'),
   path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
]