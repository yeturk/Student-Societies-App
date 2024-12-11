package com.project.services.impl;

import java.io.File;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import com.project.dto.DtoMultipleEmail;
import com.project.services.IEmailService;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailServiceImpl implements IEmailService{

	@Autowired
	private JavaMailSender mailSender;
	
	@Async
	@Override
	public void sendEmailToMultipleRecipients(DtoMultipleEmail dtoMultipleEmail) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);

            // Set email details
           // helper.setFrom("ofkoc0900@gmail.com"); // Replace with your email
            helper.setTo(dtoMultipleEmail.getTo());              // Add multiple recipients
            helper.setSubject(dtoMultipleEmail.getSubject());
            helper.setText(dtoMultipleEmail.getBody(), false); // 'false' for plain text email
            
         // Add the image as an attachment
            File imageFile = new File(dtoMultipleEmail.getImagePath());
            helper.addAttachment(imageFile.getName(), imageFile);

            // Send the email
            mailSender.send(mimeMessage);
            System.out.println("Email sent successfully to multiple recipients!");
        } catch (MessagingException e) {
            e.printStackTrace();
            System.out.println("Failed to send email: " + e.getMessage());
        }
    }
}
