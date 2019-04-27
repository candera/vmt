import javafx.application.Application;
import javafx.stage.Stage;

public class ShimApplication extends Application {
  public Stage primaryStage;
   @Override     
   public void start(Stage primaryStage) throws Exception {
     this.primaryStage = primaryStage;
      /* 
      Code for JavaFX application. 
      (Stage, scene, scene graph) 
      */       
   }         
   public static void main(String args[]){           
      launch(args);      
   } 
} 
