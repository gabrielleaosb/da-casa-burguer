from django.db import models

class CarouselItem(models.Model):
    nome = models.CharField(max_length=100, verbose_name="Nome do Item")
    descricao = models.TextField(verbose_name="Descrição")
    imagem = models.ImageField(
        upload_to='carousel/',
        verbose_name="Imagem do Carrossel",
        help_text="Envie imagens com proporção 4:3 para melhor visualização"
    )
    ativo = models.BooleanField(default=True, verbose_name="Ativo?")
    ordem = models.PositiveIntegerField(
        default=0,
        verbose_name="Ordem de exibição",
        help_text="Itens com ordem menor aparecem primeiro"
    )

    class Meta:
        verbose_name = "Item do Carrossel"
        verbose_name_plural = "Itens do Carrossel"
        ordering = ['ordem', 'nome']

    def __str__(self):
        return self.nome
    

class Categoria(models.Model):
    nome = models.CharField(max_length=100)

    def __str__(self):
        return self.nome

class Tipo(models.Model):
    nome = models.CharField(max_length=100)

    def __str__(self):
        return self.nome


class Comida(models.Model):
    nome = models.CharField(max_length=100)
    descricao = models.TextField(max_length=300, verbose_name="Descrição")
    preco = models.DecimalField(max_digits=6, decimal_places=2)
    imagem = models.ImageField(upload_to="comidas/", verbose_name="Imagens das Comidas")
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE, related_name="comidas")
    tipo = models.ForeignKey(Tipo, on_delete=models.CASCADE, related_name="comidas", default=1)

    def __str__(self):
        return self.nome

