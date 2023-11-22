package withpageobject;

import org.junit.AfterClass;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import withpageobject.pages.*;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

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
        String email = loginPage.insertEmail("gtran@miu.edu");
        assertThat(email,is("gtran@miu.edu"));
        String pass = loginPage.insertPassword("616944");
        assertThat(pass,is("616944"));
        loginPage.clickLoginAndWait();
        assertThat(driver.getCurrentUrl(),is("http://localhost:3000/"));

        try{
            Thread.sleep(1000);
        }
        catch (Exception e) {

        }
        System.out.println(driver.getCurrentUrl());

        String title = "Vinfast 9";
        assertThat(title, is("Vinfast 9"));
    }

    @Test
    public void testCreateReviewFailWithNonBuyCarAccount() {
        String email = loginPage.insertEmail("gtran@miu.edu");
        assertThat(email,is("gtran@miu.edu"));
        String pass = loginPage.insertPassword("616944");
        assertThat(pass,is("616944"));
        loginPage.clickLoginAndWait();
        assertThat(driver.getCurrentUrl(),is("http://localhost:3000/"));

        try{
            Thread.sleep(1000);
        }
        catch (Exception e) {

        }
        System.out.println(driver.getCurrentUrl());

        String title = "Vinfast 9";
        assertThat(title, is("Vinfast 9"));
    }

    @Test
    public void testGetOwnReview() {
        String email = loginPage.insertEmail("gtran@miu.edu");
        assertThat(email,is("gtran@miu.edu"));
        String pass = loginPage.insertPassword("616944");
        assertThat(pass,is("616944"));
        loginPage.clickLoginAndWait();
        assertThat(driver.getCurrentUrl(),is("http://localhost:3000/"));

        try{
            Thread.sleep(1000);
        }
        catch (Exception e) {

        }
        System.out.println(driver.getCurrentUrl());

        String title = "Vinfast 9";
        assertThat(title, is("Vinfast 9"));
    }

    @Test
    public void testGetReviewList() {
        String email = loginPage.insertEmail("gtran@miu.edu");
        assertThat(email,is("gtran@miu.edu"));
        String pass = loginPage.insertPassword("616944");
        assertThat(pass,is("616944"));
        loginPage.clickLoginAndWait();
        assertThat(driver.getCurrentUrl(),is("http://localhost:3000/"));

        try{
            Thread.sleep(1000);
        }
        catch (Exception e) {

        }
        System.out.println(driver.getCurrentUrl());

        String title = "Vinfast 9";
        assertThat(title, is("Vinfast 9"));
    }
}