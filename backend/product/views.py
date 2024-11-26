from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from .filters import ProductsFilter
from .serializers import ProductSerializer
from .models import Product

# Create your views here.

# @api_view(['GET'])
# def get_products(request):
#     products = Product.objects.all()
#     serializer = ProductSerializer(products, many=True)
#     return Response({"products": serializer.data})

@api_view(['GET'])
def get_product(request, pk):
    try:
        product = Product.objects.get(id=pk)
        serializer = ProductSerializer(product)
        return Response({"product": serializer.data})
    except Product.DoesNotExist:
        return Response({"error": "Product not found"}, status=404)


@api_view(['GET'])
def get_products(request):
    # Appliquer les filtres
    filterset = ProductsFilter(request.GET, queryset=Product.objects.all())

    if not filterset.is_valid():
        return Response({"errors": filterset.errors}, status=400)

    # Pagination
    paginator = PageNumberPagination()
    paginator.page_size = 10
    paginated_queryset = paginator.paginate_queryset(filterset.qs, request)

    # Sérialisation
    serializer = ProductSerializer(paginated_queryset, many=True)
    return paginator.get_paginated_response({"products": serializer.data})

# @api_view(['POST'])
# def create_product(request):
#     serializer = ProductSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response({"message": "Produit créé avec succès", "product": serializer.data}, status=201)
#     return Response({"errors": serializer.errors}, status=400)
