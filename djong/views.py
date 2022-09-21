from django.shortcuts import render
import re

def mobile(request):
    MOBILE_AGENT_RE=re.compile(r".*(iphone|mobile|androidtouch)",re.IGNORECASE)
    if MOBILE_AGENT_RE.match(request.META['HTTP_USER_AGENT']):
        return True
    else:
        return False


def Index(request):
    return render(request, "index.html")

# def Nosotros(request):
#     return render(request, "nosotros.html")

def Contacto(request):
    if mobile(request):
        is_mobile = True
    else:
        is_mobile = False

    context = {
        'is_mobile': is_mobile,
    }
    return render(request, "contacto.html", context)
