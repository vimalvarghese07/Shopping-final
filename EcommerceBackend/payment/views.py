from django.shortcuts import render
import razorpay
from .models import PaymentModel
from .serializers import PaymentSerializer
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

# Create your views here.

client = razorpay.Client(auth=("rzp_test_X0BeAfg82FLyFq", "RvVfXmSyz2QzlTxzXmJcgIDJ"))

@csrf_exempt
def createPayment(request):
    if request.method == 'POST':
        amount = int(request.POST.get('amount'))
        currency = int(request.POST.get('currency'))
        order = client.order.create(dict(amount=amount,currency=currency))
        serializer = PaymentSerializer(data=dict(
            razorpay_order_id=order['id'],
            amount=order['amount'],
            currency=order['currency'],
            status=order['status']))
        serializer.is_valid(raise_exception = True)
        serializer.save()
        return JsonResponse(serializer.data)