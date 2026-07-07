from django.db import models


class Car(models.Model):
    brand = models.CharField(max_length=80)
    model = models.CharField(max_length=80)
    year = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    mileage = models.PositiveIntegerField()
    color = models.CharField(max_length=50)
    transmission = models.CharField(max_length=50)
    fuel_type = models.CharField(max_length=50)
    is_available = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at", "brand"]

    def __str__(self):
        return f"{self.brand} {self.model} {self.year}"
