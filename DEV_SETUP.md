
# Passo a Passo para Rodar o Projeto

Este guia irá te mostrar como rodar o projeto localmente, rodar o servidor com **Uvicorn** para testes e expor a aplicação para a internet usando **Serveo**.

---

## 1. **Rodar o Tailwind CSS**

No **Terminal 1**, execute o comando abaixo para rodar o **Tailwind CSS** e compilar o arquivo `input.css` em `output.css`:

### Comando:
```bash
npx @tailwindcss -i ./menu/static/menu/css/input.css -o ./menu/static/menu/css/output.css --watch
```

Ou, se você estiver usando o script configurado no `package.json`, você pode rodar:

```bash
npm run dev
```

Isso irá iniciar o processo de observação e compilação do **Tailwind CSS** automaticamente.

---

## 2. **Rodar o Servidor Django**

No **Terminal 2**, execute o comando abaixo para iniciar o servidor **Django**:

### Comando:
```bash
python manage.py runserver
```

Isso vai rodar o servidor localmente, geralmente em `http://127.0.0.1:8000/`.

---

## 3. **Rodar o Servidor com Uvicorn (para testes)**

Se você quiser rodar o servidor com **Uvicorn** para testes (em vez do servidor Django padrão), use o seguinte comando:

### Comando:
```bash
uvicorn cardapio.asgi:application --host 0.0.0.0 --port 8000
```

Isso vai iniciar o servidor de forma otimizada e mais rápida, utilizando o **Uvicorn**.

---

## 4. **Expor o Servidor para a Internet (com Serveo)**

Para expor o seu servidor local para a internet e permitir o acesso público, use o **Serveo** com o seguinte comando:

### Comando:
```bash
ssh -R 80:localhost:8000 serveo.net
```

Esse comando cria um túnel para que você possa acessar seu servidor local através de um link público. O link gerado será algo como:

```
https://seu-link.serveo.net/
```

Esse link será acessível de qualquer lugar.

---

## Resumo

- **Terminal 1**: Compilar **Tailwind CSS** com `npx` ou `npm run dev`.
- **Terminal 2**: Rodar o servidor **Django** com `python manage.py runserver`.
- **Para Testes**: Rodar o servidor com **Uvicorn** usando `uvicorn cardapio.asgi:application --host 0.0.0.0 --port 8000`.
- **Expor para a Internet**: Usar **Serveo** com `ssh -R 80:localhost:8000 serveo.net`.

Agora, você tem tudo o que precisa para rodar o projeto localmente, fazer testes com o Uvicorn, e até mesmo expor a aplicação com o Serveo. 😊

---

## Problemas Comuns

- **Dependências não encontradas**: Verifique se o ambiente virtual está ativado e se você rodou o comando `pip install -r requirements.txt`.
- **Erro ao rodar o servidor**: Verifique se o `Uvicorn` está instalado corretamente e se você rodou o comando `uvicorn cardapio.asgi:application --host 0.0.0.0 --port 8000`.
- **Problema ao usar o Serveo**: Certifique-se de que você tem o **SSH** instalado corretamente e que o comando foi executado sem erros. Caso precise de uma alternativa ao Serveo, considere usar **ngrok**.

---

## Contato

Se tiver algum problema, entre em contato comigo:

- **E-mail**: [seu-email@dominio.com](mailto:seu-email@dominio.com)
