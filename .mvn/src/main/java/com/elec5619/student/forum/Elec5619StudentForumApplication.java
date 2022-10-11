package com.elec5619.student.forum;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.Storage;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

@SpringBootApplication
public class Elec5619StudentForumApplication {

	public static void main(String[] args) throws IOException {
		FileInputStream serviceAccount =
				new FileInputStream("src/main/resources/GoogleService/notepile-dc18b-firebase-adminsdk-r6d6r-20cd12a2a9.json");

		FirebaseOptions options = new FirebaseOptions.Builder()
				.setCredentials(GoogleCredentials.fromStream(serviceAccount))
				.build();

		FirebaseApp.initializeApp(options);
		SpringApplication.run(Elec5619StudentForumApplication.class, args);
	}

}
