from rest_framework import serializers
from .models import Car


class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = [
            "id",
            "brand",
            "model",
            "year",
            "price",
            "mileage",
            "color",
            "transmission",
            "fuel_type",
            "is_available",
            "created_at",
        ]
