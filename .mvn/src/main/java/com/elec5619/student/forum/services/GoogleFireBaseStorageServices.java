package com.elec5619.student.forum.services;

import com.google.auth.Credentials;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.*;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;

@Service
public class GoogleFireBaseStorageServices {


    public boolean uploadFile(File file, String fileName, String bucketName) throws IOException {
        BlobId blobId = BlobId.of("Notepile", fileName);
        BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType("media").build();
        Credentials credentials = GoogleCredentials.fromStream(new FileInputStream("src/main/resources/GoogleService/notepile-dc18b-firebase-adminsdk-r6d6r-20cd12a2a9.json"));
        Storage storage = StorageOptions.newBuilder().setCredentials(credentials).build().getService();
        storage.create(blobInfo, Files.readAllBytes(file.toPath()));
        return true;
    }

    public boolean createBucket() throws IOException {
        Credentials credentials = GoogleCredentials.fromStream(new FileInputStream("src/main/resources/GoogleService/notepile-dc18b-firebase-adminsdk-r6d6r-20cd12a2a9.json"));
        Storage storage = StorageOptions.newBuilder().setCredentials(credentials).build().getService();
        StorageClass storageClass = StorageClass.COLDLINE;
        String location = "ASIA";
        Bucket bucket =
                storage.create(
                        BucketInfo.newBuilder("Notepile")
                                .setStorageClass(storageClass)
                                .setLocation(location)
                                .build());
        return true;
    }

    public File convertToLocalFile(MultipartFile multipartFile, String filePath) throws IOException {
        File file = new File(filePath);
        try (FileOutputStream fos = new FileOutputStream(file)) {
            fos.write(multipartFile.getBytes());
            fos.close();
        }
        return  file;
    }



    public String getExtension(String fileName) {
        return fileName.substring(fileName.lastIndexOf("."));
    }
}
