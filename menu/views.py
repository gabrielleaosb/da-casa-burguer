from django.shortcuts import render
from django.views import View

class MenuView(View):
    def get(self, request):
        return render(request, 'menu/index.html')