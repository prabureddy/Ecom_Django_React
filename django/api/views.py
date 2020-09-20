from django.http import JsonResponse

# Create your views here.
def home(request):
    return JsonResponse({'info': 'Ecomm Website using React and Django', 'name': 'Bhargava Prabu Reddy'})