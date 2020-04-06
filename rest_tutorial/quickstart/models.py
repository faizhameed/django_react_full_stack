from django.db import models

# Create your models here.
class Leads(models.Model):
    lead_owner=models.CharField(max_length=30)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)

class Lead_detail(models.Model):
    leads=models.ForeignKey(Leads,on_delete=models.CASCADE)
    date_created=models.DateTimeField()

    def __str__(self):
        return self.leads