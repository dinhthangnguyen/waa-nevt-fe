package withpageobject;

import org.junit.AfterClass;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import withpageobject.pages.*;

import static org.hamcrest.CoreMatchers.hasItem;
import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

import java.util.ArrayList;
import java.util.List;

public class ReviewTest {

    private static LoginPage loginPage;
    private static CarPage carPage;

    WebDriver driver;

    @Before
    public void createWebDriver() {
        // set path to chromedriver.exe
        System.setProperty("webdriver.chrome.driver", "C:\\tmp\\chromedriver-win64\\chromedriver.exe");
        ChromeOptions options = new ChromeOptions();
        options.setBinary("C:\\tmp\\chrome-headless-shell-win64\\chrome-headless-shell.exe");
        options.addArguments("--remote-allow-origins=*");
        // create chrome instance
        driver = new ChromeDriver(options);
        loginPage = new LoginPage(driver);
        loginPage.open("http://localhost:3000/login");
        carPage = new CarPage(driver);
    }

    @AfterClass
    public static void closeTheBrowser() {
        loginPage.close();
    }

    @Test
    public void testCreateReview() {
        String email = loginPage.insertEmail("dnguyen@miu.edu");
        assertThat(email,is("dnguyen@miu.edu"));
        String pass = loginPage.insertPassword("616940");
        assertThat(pass,is("616940"));
        loginPage.clickLoginAndWait();
        assertThat(driver.getCurrentUrl(),is("http://localhost:3000/"));

        carPage.open("http://localhost:3000/cars/b8f29c31-6f79-4cc4-b939-f5048d4a4f3c");
        try{
            Thread.sleep(1000);
        }
        catch (Exception e) {

        }
        String review = carPage.enterReview("Hello");
        assertThat(review, is("Hello"));
        carPage.clickAddReview();
        boolean isExistedYourReview = carPage.checkExistedYourReview();
        assertThat(isExistedYourReview, is(true));
    }


    @Test
    public void testGetOwnReview() {
        String email = loginPage.insertEmail("dnguyen@miu.edu");
        assertThat(email,is("dnguyen@miu.edu"));
        String pass = loginPage.insertPassword("616940");
        assertThat(pass,is("616940"));
        loginPage.clickLoginAndWait();
        assertThat(driver.getCurrentUrl(),is("http://localhost:3000/"));

        carPage.open("http://localhost:3000/cars/b8f29c31-6f79-4cc4-b939-f5048d4a4f3c");
        try{
            Thread.sleep(1000);
        }
        catch (Exception e) {

        }
        boolean isExistedYourReview = carPage.checkExistedYourReview();
        assertThat(isExistedYourReview, is(true));
    }

    @Test
    public void testGetReviewList() {
        carPage.open("http://localhost:3000/cars/b8f29c31-6f79-4cc4-b939-f5048d4a4f3c");
        try{
            Thread.sleep(1000);
        }
        catch (Exception e) {

        }
        boolean isHaveReviewTable = carPage.checkExistedReviewTable();
        assertThat(isHaveReviewTable, is(true));
    }
}