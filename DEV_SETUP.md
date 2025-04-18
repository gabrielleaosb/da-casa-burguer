# Run #

### Termimal 1 ###
`npx @tailwindcss -i ./menu/static/menu/css/input.css -o ./menu/static/menu/css/output.css --watch`
ou
`nmp run dev`

### Terminal 2 ###
`python manage.py runserver`

### Para Testes ###

`uvicorn cardapio.asgi:application --reload --host 0.0.0.0 --port 8000`