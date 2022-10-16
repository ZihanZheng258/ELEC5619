## Used libraries and their versions

| **Library** | **Version** |  
| --- | --- |  
| Spring Boot | 2.7.2 |  
| JDK | 11 |  
| Bootstrap | 5.2.1 |  
| MySQL | 8.0 |  
| Lombook | Default version for spring boot starter |  
| Spring security | Default version for spring boot starter |  
| JPA Hibernate | Default version for spring boot starter |  
| Axios | 0.27.2 |  
| React | 18.2.0 |  
| React-router-dom | 6.3.0 |  
| material-react-table | 1.2.9 |  
| antd | 4.23.2 |  
| @ant-design/icons | 4.7.0 |  
| Security -JWT | 1.1.0.RELEASE |  
| Spring Web-starter | Default version for spring boot starter |  
| commons | Default version for spring boot starter |  
| Jackson | Default version for spring boot starter |  
| Spring test starter | Default version for spring boot starter |

## Working functionalities

### Signup:

·Users can create account with their mobile number and email to log in to Notepile.

·when user sign up in Notepile, their account will be initialize with 100 credit, and their password will also be encrypt with BCryptPasswordEncoder that provide by spring security.

**Login:**

·Users can log in successfully by entering the correct account number and password.

·if password or nickname wrong, server will response with error message, if success, server will return a JWT token for client to identify itself and store user state.

**Discussion:**

·Users can create discussions and add titles, content and categories to which they belong.

·if the category name user entered does not exist, the server will create a new category with that name and store the discussion within it.

·Users can view discussion details such as the like number, title and content of it. with the comments attached to this discussion.

·User can like discussion by clicking the red hearts. And the owner of the liked discussion will get 10 credits for buying notes.

·the discussion list page can show different states of the red heart according is this discussion has been liked by the current user, and clicking the heart that has been liked can cancel the like.

·Users can add comments on the discussion detail pages. And the comments can be the structure of parent-child comments so that users can easily find out the relationships between comments.

·Users can reply to comments of discussions.

·Users can view the status of the discussions liked/posted(actions, titles, descriptions, categories, views, likes, comments and create dates)

·discussion list page is been paged, every page max 15 discussions.

·discussion list page provides a sidebar for the user to search for discussions of different categories.

·discussion list page provides a search bar for users to do a keyword search of the content of the discussion.

·discussion title and content can be edited by the owner.

· Users can view the discussions that have been created by them on their page.

**Note:**

·Users can create notes.

·Users can upload a note file while creating a note, the file will be stored on the server.

·Users can view titles, descriptions and comments on notes.

·there is a note list page for users to view the notes, and they are been paged, max 15 notes per page.

·note list page provides a sidebar for users to search for the note of different categories.

·note list page provides a keyword search bar for users to search for the note using the keyword of its description

·Users can add comments on notes.

·Users can reply to comments or notes. the comments also can be a parent-child structure for users to find out their relationship easily.

·Users can save notes into their wish lists.

·Users can buy notes. it will cost their credit and transfer to the owner of the note, if there have not enough credit server will send an error message.

·Users can download a note file they bought or owned.

·Users can view the notes that they brought, owned or wished on their personal page.

·Users can Edit the title and description of their owned note.

**Notice:**

·when the user sends a comment to a discussion, a note, the comments attached to a discussion or note or buy a new note, the server will create a notice and set the actor as sender and the owner of note/discussion/comment as a receiver, in personal detail page user can view the notice that about them.

·Unread notifications are marked with a red dot, and once the user has clicked on notice, the red dot will disappear, indicating that the status of the notice is read.

**Personal profile:**

·Users can view their personal information(nicknames, emails, credits, phone numbers and so on.

**Weather & Location:**

·Users can view weather in Sydney, it’s because the back end server send request to third party external api aerisweather to get the weather situation, but there have time limit for calling this api every day because we use free plan, 100 times per day.

·the front end will use third party api to get the current location of client device.

**Quick guide**

How to run this application:

**Download:**

·Download this project and unzip it.

·Open the project with any IDE you like(IntelliJ IDEA are used while developing this project).

**Set database:**

·It is recommended to use MySQL 8.0 as the database for this project.

·An user with granted read/write rights should be create in the database.

·Access /[src](https://github.com/ZihanZheng258/ELEC5619/tree/master/src)/[main](https://github.com/ZihanZheng258/ELEC5619/tree/master/src/main)/[resources](https://github.com/ZihanZheng258/ELEC5619/tree/master/src/main/resources)/application.yml

·Change the red part below in the application.yml file to the name of your database:

url: jdbc:mysql://localhost:3306/studentForum?serverTimezone=UTC

·Change the username and password below in the application.yml file to your username and password of the database:

username: xxxx

password: xxxx

**Set project:**

·Open the Run/Debug Configuration on IDE and set parameter Run to spring-boot: run

**Run:**

·Select the run method you have just set up to run the back end. Specifically you can press the green button below：

![b780855943449e1760bbe988b769203](file:////Users/cjh/Library/Group%20Containers/UBF8T346G9.Office/TemporaryItems/msohtmlclip/clip_image001.png)

·Run the front-end by entering the following command in the IDE terminal .

cd .\forum_client\

npm start

·After running successfully your browser will open a page with the URL http://localhost:3000/