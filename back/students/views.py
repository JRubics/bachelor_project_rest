from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.core.files.storage import FileSystemStorage

class HelloView(APIView):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication,)

    def get(self, request):
        content = {'message': 'Hello, World!'}
        return Response(content)

class UploadFileView(APIView):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication,)

    def post(self, request):
        document = request.FILES.get('file')
        if document.size > 1024:
            content = {'message': 'File too big'}
            return Response(content)
        fs = FileSystemStorage()
        filename = fs.save(document.name, document)

        # assignment = Assignment.objects.create(student=request.user, filename=filename);

        # uploaded_file_url = fs.url(filename)
        # return render(request, 'students/upload_document.html', {
        #     'uploaded_file_url': uploaded_file_url
        # })
        content = {'message': 'Hello, World!'}
        return Response(content)