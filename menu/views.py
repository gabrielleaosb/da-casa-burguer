from django.shortcuts import render
from .models import CarouselItem, Comida, Categoria


def menu_view(request):
    carousel_items = CarouselItem.objects.filter(ativo=True).order_by('ordem', 'nome')
    hamburguer_categoria = Categoria.objects.get(nome='Hamburguer')
    milkshake_categoria = Categoria.objects.get(nome='Milkshakes')
    bebidas_categoria = Categoria.objects.get(nome='Bebidas')

    comidas_hamburguer = Comida.objects.filter(categoria=hamburguer_categoria)
    comidas_milkshakes = Comida.objects.filter(categoria=milkshake_categoria)
    comidas_bebidas = Comida.objects.filter(categoria=bebidas_categoria)

    imagens_touch = [
        {"nome": "Imagem 1", "url": "menu/fotos/01.jpg"},
        {"nome": "Imagem 2", "url": "menu/fotos/02.jpg"},
        {"nome": "Imagem 3", "url": "menu/fotos/03.jpg"},
        {"nome": "Imagem 4", "url": "menu/fotos/04.jpg"},
        {"nome": "Imagem 5", "url": "menu/fotos/05.jpg"},
        {"nome": "Imagem 6", "url": "menu/fotos/06.jpg"},
        {"nome": "Imagem 7", "url": "menu/fotos/07.jpg"},
        {"nome": "Imagem 8", "url": "menu/fotos/08.jpg"},
    ]
    
    context = {
        'carousel_items': carousel_items,
        'comidas_hamburguer': comidas_hamburguer,
        'comidas_milkshakes': comidas_milkshakes,
        'comidas_bebidas': comidas_bebidas,
        'imagens_touch': imagens_touch
    }
    return render(request, 'menu/index.html', context)