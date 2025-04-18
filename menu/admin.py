from django.contrib import admin
from .models import CarouselItem, Comida, Categoria, Tipo


@admin.register(CarouselItem)
class CarouselItemAdmin(admin.ModelAdmin):
    list_display = ('nome', 'ordem', 'ativo')
    list_editable = ('ordem', 'ativo')
    list_filter = ('ativo',)
    search_fields = ('nome', 'descricao')


@admin.register(Categoria)
class CategoriaAdmin(admin.ModelAdmin):
    list_display = ('nome',)
    search_fields = ('nome',)


@admin.register(Tipo)
class TipoAdmin(admin.ModelAdmin):
    list_display = ('id', 'nome')
    search_fields = ('nome',)

@admin.register(Comida)
class ComidaAdmin(admin.ModelAdmin):
    list_display = ('nome', 'categoria', 'preco')
    list_editable = ('preco',)
    list_filter = ('categoria',)
    search_fields = ('nome', 'descricao')
