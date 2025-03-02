import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private serviceId = 'service_0t28ak9';
  private templateId = 'template_4iy0x1n';
  private userId = 'Hgtt-zuSTdP0xp2jn';


  constructor() { }

  sendEmail(emailData: any) {
    return emailjs.send(this.serviceId, this.templateId, emailData, this.userId);
  }
}
