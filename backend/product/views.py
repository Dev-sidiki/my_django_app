from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import ProductSerializer

from .models import Product

# Create your views here.

@api_view(['GET'])
def get_products(request):
    category = request.GET.get('category')
    price_min = request.GET.get('price_min')
    price_max = request.GET.get('price_max')

    products = Product.objects.all()

    if category:
        products = products.filter(category__icontains=category)
    if price_min:
        products = products.filter(price__gte=price_min)
    if price_max:
        products = products.filter(price__lte=price_max)

    serializer = ProductSerializer(products, many=True)
    return Response({"products": serializer.data})

@api_view(['GET'])
def get_product(request, pk):
    try:
        product = Product.objects.get(id=pk)
        serializer = ProductSerializer(product)
        return Response({"product": serializer.data})
    except Product.DoesNotExist:
        return Response({"error": "Product not found"}, status=404)


# @api_view(['POST'])
# def create_product(request):
#     serializer = ProductSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response({"message": "Produit créé avec succès", "product": serializer.data}, status=201)
#     return Response({"errors": serializer.errors}, status=400)
