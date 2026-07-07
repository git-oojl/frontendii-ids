from django.db.models import Q
from rest_framework import viewsets
from .models import Car
from .serializers import CarSerializer


class CarViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = CarSerializer

    def get_queryset(self):
        queryset = Car.objects.all()

        brand = self.request.query_params.get("brand")
        model = self.request.query_params.get("model")
        search = self.request.query_params.get("search")
        is_available = self.request.query_params.get("is_available")

        if brand:
            queryset = queryset.filter(brand__icontains=brand)

        if model:
            queryset = queryset.filter(model__icontains=model)

        if search:
            queryset = queryset.filter(
                Q(brand__icontains=search) | Q(model__icontains=search)
            )

        if is_available in ["true", "false"]:
            queryset = queryset.filter(is_available=is_available == "true")

        return queryset
