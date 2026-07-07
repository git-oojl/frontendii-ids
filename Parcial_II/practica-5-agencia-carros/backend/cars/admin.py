from django.contrib import admin
from .models import Car


@admin.register(Car)
class CarAdmin(admin.ModelAdmin):
    list_display = (
        "brand",
        "model",
        "year",
        "price",
        "mileage",
        "color",
        "transmission",
        "fuel_type",
        "is_available",
    )
    list_filter = ("brand", "transmission", "fuel_type", "is_available")
    search_fields = ("brand", "model", "color")
