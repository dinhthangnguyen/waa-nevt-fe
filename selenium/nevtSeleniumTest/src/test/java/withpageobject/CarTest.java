package withpageobject;

import org.junit.AfterClass;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import withpageobject.pages.*;

import static org.hamcrest.CoreMatchers.containsString;
import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

public class CarTest {

    private static LoginPage loginPage;
    private static CarPage carPage;
    private static AddCarPage addCarPage;
    private static AddAttributeCarPage addAttributeCarPage;

    private static AddImagesCarPage addImagesCarPage;

    WebDriver driver;

    @Before
    public void createWebDriver() {
        // set path to chromedriver.exe
        System.setProperty("webdriver.chrome.driver", "/Users/thangnguyen/Desktop/WAA/lab/lab13/chromedriver-mac-arm64/chromedriver");
        ChromeOptions options = new ChromeOptions();
        options.setBinary("/Users/thangnguyen/Desktop/WAA/lab/lab13/chrome-headless-shell-mac-arm64/chrome-headless-shell");
        options.addArguments("--remote-allow-origins=*");
        // create chrome instance
        driver = new ChromeDriver(options);
        loginPage = new LoginPage(driver);
        loginPage.open("http://localhost:3000/login");
        carPage = new CarPage(driver);
        addCarPage = new AddCarPage(driver);
    }

    @AfterClass
    public static void closeTheBrowser() {
        loginPage.close();
    }

    @Test
    public void testCreateCar() {
        String email = loginPage.insertEmail("gtran@miu.edu");
        assertThat(email,is("gtran@miu.edu"));
        String pass = loginPage.insertPassword("616944");
        assertThat(pass,is("616944"));
        loginPage.clickLoginAndWait();
        assertThat(driver.getCurrentUrl(),is("http://localhost:3000/"));

        addCarPage.open("http://localhost:3000/manage-car/car");
        String carname = addCarPage.insertName("Vinfast 9");
        assertThat(carname, is("Vinfast 9"));

        String basePrice = addCarPage.insertBasePrice("65000");
        assertThat(basePrice, is("65000"));

        String description = addCarPage.insertDescription("VinFast is a leading Vietnamese electric car manufacturer that promises to bring affordable & luxury electric cars with powerful engines");
        assertThat(description, is("VinFast is a leading Vietnamese electric car manufacturer that promises to bring affordable & luxury electric cars with powerful engines"));

        String year = addCarPage.insertYear("2023");
        assertThat(year, is("2023"));

        String model = addCarPage.insertModel("Luxury");
        assertThat(model, is("Luxury"));

        String make = addCarPage.insertMake("Vinfast");
        assertThat(make, is("Vinfast"));

        String stockQuantity = addCarPage.insertBasePrice("15");
        assertThat(stockQuantity, is("15"));
        try{
            Thread.sleep(1000);
        }
        catch (Exception e) {

        }
        addAttributeCarPage = addCarPage.clickSubmit();

        try{
            Thread.sleep(1000);
        }
        catch (Exception e) {

        }

        addImagesCarPage = addAttributeCarPage.clickSubmit();


        carPage = addImagesCarPage.clickSubmit();

        System.out.println(driver.getCurrentUrl());

        //String title = carPage.getCarName();
        //assertThat(title, is("Vinfast 9"));
    }

    @Test
    public void testCreateCarFailWithNullPrice() {
        String email = loginPage.insertEmail("gtran@miu.edu");
        assertThat(email,is("gtran@miu.edu"));
        String pass = loginPage.insertPassword("616944");
        assertThat(pass,is("616944"));
        loginPage.clickLoginAndWait();
        assertThat(driver.getCurrentUrl(),is("http://localhost:3000/"));

        addCarPage.open("http://localhost:3000/manage-car/car");
        String carname = addCarPage.insertName("Vinfast 9");
        assertThat(carname, is("Vinfast 9"));

        String basePrice = addCarPage.insertBasePrice("65000");
        assertThat(basePrice, is("65000"));

        String description = addCarPage.insertDescription("VinFast is a leading Vietnamese electric car manufacturer that promises to bring affordable & luxury electric cars with powerful engines");
        assertThat(description, is("VinFast is a leading Vietnamese electric car manufacturer that promises to bring affordable & luxury electric cars with powerful engines"));

        String year = addCarPage.insertYear("2023");
        assertThat(year, is("2023"));

        String model = addCarPage.insertModel("Luxury");
        assertThat(model, is("Luxury"));

        String make = addCarPage.insertMake("Vinfast");
        assertThat(make, is("Vinfast"));

        String stockQuantity = addCarPage.insertBasePrice("15");
        assertThat(stockQuantity, is("15"));
        try{
            Thread.sleep(1000);
        }
        catch (Exception e) {

        }
        addAttributeCarPage = addCarPage.clickSubmit();

        try{
            Thread.sleep(1000);
        }
        catch (Exception e) {

        }

        addImagesCarPage = addAttributeCarPage.clickSubmit();


        carPage = addImagesCarPage.clickSubmit();

        System.out.println(driver.getCurrentUrl());

        //String title = carPage.getCarName();
        //assertThat(title, is("Vinfast 9"));
    }

    @Test
    public void testCreateCarFailWithNonePermissionUser() {
        String email = loginPage.insertEmail("gtran@miu.edu");
        assertThat(email,is("gtran@miu.edu"));
        String pass = loginPage.insertPassword("616944");
        assertThat(pass,is("616944"));
        loginPage.clickLoginAndWait();
        assertThat(driver.getCurrentUrl(),is("http://localhost:3000/"));

        addCarPage.open("http://localhost:3000/manage-car/car");
        String carname = addCarPage.insertName("Vinfast 9");
        assertThat(carname, is("Vinfast 9"));

        String basePrice = addCarPage.insertBasePrice("65000");
        assertThat(basePrice, is("65000"));

        String description = addCarPage.insertDescription("VinFast is a leading Vietnamese electric car manufacturer that promises to bring affordable & luxury electric cars with powerful engines");
        assertThat(description, is("VinFast is a leading Vietnamese electric car manufacturer that promises to bring affordable & luxury electric cars with powerful engines"));

        String year = addCarPage.insertYear("2023");
        assertThat(year, is("2023"));

        String model = addCarPage.insertModel("Luxury");
        assertThat(model, is("Luxury"));

        String make = addCarPage.insertMake("Vinfast");
        assertThat(make, is("Vinfast"));

        String stockQuantity = addCarPage.insertBasePrice("15");
        assertThat(stockQuantity, is("15"));
        try{
            Thread.sleep(1000);
        }
        catch (Exception e) {

        }
        addAttributeCarPage = addCarPage.clickSubmit();

        try{
            Thread.sleep(1000);
        }
        catch (Exception e) {

        }

        addImagesCarPage = addAttributeCarPage.clickSubmit();

        carPage = addImagesCarPage.clickSubmit();


        System.out.println(driver.getCurrentUrl());

        //String title = carPage.getCarName();
        //assertThat(title, is("Vinfast 9"));
    }

    @Test
    public void testGetCar() {
        String email = loginPage.insertEmail("gtran@miu.edu");
        assertThat(email,is("gtran@miu.edu"));
        String pass = loginPage.insertPassword("616944");
        assertThat(pass,is("616944"));
        loginPage.clickLoginAndWait();
        assertThat(driver.getCurrentUrl(),is("http://localhost:3000/"));

        addCarPage.open("http://localhost:3000/manage-car/car");
        String carname = addCarPage.insertName("Vinfast 9");
        assertThat(carname, is("Vinfast 9"));

        String basePrice = addCarPage.insertBasePrice("65000");
        assertThat(basePrice, is("65000"));

        String description = addCarPage.insertDescription("VinFast is a leading Vietnamese electric car manufacturer that promises to bring affordable & luxury electric cars with powerful engines");
        assertThat(description, is("VinFast is a leading Vietnamese electric car manufacturer that promises to bring affordable & luxury electric cars with powerful engines"));

        String year = addCarPage.insertYear("2023");
        assertThat(year, is("2023"));

        String model = addCarPage.insertModel("Luxury");
        assertThat(model, is("Luxury"));

        String make = addCarPage.insertMake("Vinfast");
        assertThat(make, is("Vinfast"));

        String stockQuantity = addCarPage.insertBasePrice("15");
        assertThat(stockQuantity, is("15"));
        try{
            Thread.sleep(1000);
        }
        catch (Exception e) {

        }
        addAttributeCarPage = addCarPage.clickSubmit();

        try{
            Thread.sleep(1000);
        }
        catch (Exception e) {

        }

        addImagesCarPage = addAttributeCarPage.clickSubmit();


        carPage = addImagesCarPage.clickSubmit();

        System.out.println(driver.getCurrentUrl());

        //String title = carPage.getCarName();
        //assertThat(title, is("Vinfast 9"));
    }

    @Test
    public void testGetCarList() {
        String email = loginPage.insertEmail("gtran@miu.edu");
        assertThat(email,is("gtran@miu.edu"));
        String pass = loginPage.insertPassword("616944");
        assertThat(pass,is("616944"));
        loginPage.clickLoginAndWait();
        assertThat(driver.getCurrentUrl(),is("http://localhost:3000/"));

        addCarPage.open("http://localhost:3000/manage-car/car");
        String carname = addCarPage.insertName("Vinfast 9");
        assertThat(carname, is("Vinfast 9"));

        String basePrice = addCarPage.insertBasePrice("65000");
        assertThat(basePrice, is("65000"));

        String description = addCarPage.insertDescription("VinFast is a leading Vietnamese electric car manufacturer that promises to bring affordable & luxury electric cars with powerful engines");
        assertThat(description, is("VinFast is a leading Vietnamese electric car manufacturer that promises to bring affordable & luxury electric cars with powerful engines"));

        String year = addCarPage.insertYear("2023");
        assertThat(year, is("2023"));

        String model = addCarPage.insertModel("Luxury");
        assertThat(model, is("Luxury"));

        String make = addCarPage.insertMake("Vinfast");
        assertThat(make, is("Vinfast"));

        String stockQuantity = addCarPage.insertBasePrice("15");
        assertThat(stockQuantity, is("15"));
        try{
            Thread.sleep(1000);
        }
        catch (Exception e) {

        }
        addAttributeCarPage = addCarPage.clickSubmit();


        addImagesCarPage = addAttributeCarPage.clickSubmit();


        carPage = addImagesCarPage.clickSubmit();

        System.out.println(driver.getCurrentUrl());

        //String title = carPage.getCarName();
        //assertThat(title, is("Vinfast 9"));
    }

    @Test
    public void testUpdateCar() {
        String email = loginPage.insertEmail("gtran@miu.edu");
        assertThat(email,is("gtran@miu.edu"));
        String pass = loginPage.insertPassword("616944");
        assertThat(pass,is("616944"));
        loginPage.clickLoginAndWait();
        assertThat(driver.getCurrentUrl(),is("http://localhost:3000/"));

        addCarPage.open("http://localhost:3000/manage-car/car");
        String carname = addCarPage.insertName("Vinfast 9");
        assertThat(carname, is("Vinfast 9"));

        String basePrice = addCarPage.insertBasePrice("65000");
        assertThat(basePrice, is("65000"));

        String description = addCarPage.insertDescription("VinFast is a leading Vietnamese electric car manufacturer that promises to bring affordable & luxury electric cars with powerful engines");
        assertThat(description, is("VinFast is a leading Vietnamese electric car manufacturer that promises to bring affordable & luxury electric cars with powerful engines"));

        String year = addCarPage.insertYear("2023");
        assertThat(year, is("2023"));

        String model = addCarPage.insertModel("Luxury");
        assertThat(model, is("Luxury"));

        String make = addCarPage.insertMake("Vinfast");
        assertThat(make, is("Vinfast"));

        String stockQuantity = addCarPage.insertBasePrice("15");
        assertThat(stockQuantity, is("15"));

        addAttributeCarPage = addCarPage.clickSubmit();

        addImagesCarPage = addAttributeCarPage.clickSubmit();


        carPage = addImagesCarPage.clickSubmit();

        System.out.println(driver.getCurrentUrl());

        //String title = carPage.getCarName();
        //assertThat(title, is("Vinfast 9"));
    }

    @Test
    public void testDeleteCar() {
        String email = loginPage.insertEmail("gtran@miu.edu");
        assertThat(email,is("gtran@miu.edu"));
        String pass = loginPage.insertPassword("616944");
        assertThat(pass,is("616944"));
        loginPage.clickLoginAndWait();
        assertThat(driver.getCurrentUrl(),is("http://localhost:3000/"));

        addCarPage.open("http://localhost:3000/manage-car/car");
        String carname = addCarPage.insertName("Vinfast 9");
        assertThat(carname, is("Vinfast 9"));

        String basePrice = addCarPage.insertBasePrice("65000");
        assertThat(basePrice, is("65000"));

        String description = addCarPage.insertDescription("VinFast is a leading Vietnamese electric car manufacturer that promises to bring affordable & luxury electric cars with powerful engines");
        assertThat(description, is("VinFast is a leading Vietnamese electric car manufacturer that promises to bring affordable & luxury electric cars with powerful engines"));

        String year = addCarPage.insertYear("2023");
        assertThat(year, is("2023"));

        String model = addCarPage.insertModel("Luxury");
        assertThat(model, is("Luxury"));

        String make = addCarPage.insertMake("Vinfast");
        assertThat(make, is("Vinfast"));

        String stockQuantity = addCarPage.insertBasePrice("15");
        assertThat(stockQuantity, is("15"));
        try{
            Thread.sleep(1000);
        }
        catch (Exception e) {

        }
        addAttributeCarPage = addCarPage.clickSubmit();


        addImagesCarPage = addAttributeCarPage.clickSubmit();


        carPage = addImagesCarPage.clickSubmit();

        //String title = carPage.getCarName();
        //assertThat(title, is("Vinfast 9"));
    }
}