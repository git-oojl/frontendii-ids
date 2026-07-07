from django.core.management.base import BaseCommand
from cars.models import Car


class Command(BaseCommand):
    help = "Agrega carros de ejemplo para la práctica."

    def handle(self, *args, **options):
        cars = [
            {
                "brand": "Toyota",
                "model": "Corolla",
                "year": 2022,
                "price": 18500,
                "mileage": 32000,
                "color": "Blanco",
                "transmission": "Automática",
                "fuel_type": "Gasolina",
                "is_available": True,
            },
            {
                "brand": "Honda",
                "model": "Civic",
                "year": 2021,
                "price": 17200,
                "mileage": 41000,
                "color": "Negro",
                "transmission": "Automática",
                "fuel_type": "Gasolina",
                "is_available": True,
            },
            {
                "brand": "Nissan",
                "model": "Sentra",
                "year": 2020,
                "price": 14800,
                "mileage": 53000,
                "color": "Gris",
                "transmission": "Manual",
                "fuel_type": "Gasolina",
                "is_available": False,
            },
            {
                "brand": "Ford",
                "model": "Mustang",
                "year": 2019,
                "price": 28500,
                "mileage": 60000,
                "color": "Rojo",
                "transmission": "Automática",
                "fuel_type": "Gasolina",
                "is_available": True,
            },
            {
                "brand": "Chevrolet",
                "model": "Aveo",
                "year": 2023,
                "price": 15500,
                "mileage": 18000,
                "color": "Azul",
                "transmission": "Manual",
                "fuel_type": "Gasolina",
                "is_available": False,
            },
            {
                "brand": "Mazda",
                "model": "Mazda 3",
                "year": 2022,
                "price": 21000,
                "mileage": 29000,
                "color": "Rojo",
                "transmission": "Automática",
                "fuel_type": "Gasolina",
                "is_available": True,
            },
            {
                "brand": "Hyundai",
                "model": "Elantra",
                "year": 2021,
                "price": 16500,
                "mileage": 38000,
                "color": "Plata",
                "transmission": "Automática",
                "fuel_type": "Gasolina",
                "is_available": True,
            },
            {
                "brand": "Kia",
                "model": "Rio",
                "year": 2020,
                "price": 13500,
                "mileage": 47000,
                "color": "Blanco",
                "transmission": "Manual",
                "fuel_type": "Gasolina",
                "is_available": False,
            },
            {
                "brand": "Volkswagen",
                "model": "Jetta",
                "year": 2023,
                "price": 23500,
                "mileage": 15000,
                "color": "Negro",
                "transmission": "Automática",
                "fuel_type": "Gasolina",
                "is_available": True,
            },
            {
                "brand": "Tesla",
                "model": "Model 3",
                "year": 2022,
                "price": 33500,
                "mileage": 25000,
                "color": "Blanco",
                "transmission": "Automática",
                "fuel_type": "Eléctrico",
                "is_available": True,
            },
        ]

        for car_data in cars:
            Car.objects.get_or_create(
                brand=car_data["brand"],
                model=car_data["model"],
                year=car_data["year"],
                defaults=car_data,
            )

        self.stdout.write(self.style.SUCCESS("Carros de ejemplo listos."))
