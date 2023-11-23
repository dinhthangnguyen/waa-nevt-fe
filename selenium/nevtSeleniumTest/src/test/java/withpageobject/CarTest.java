package withpageobject;

import org.junit.AfterClass;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import withpageobject.extension.RandomStringGenerator;
import withpageobject.pages.*;

import java.util.Objects;
import java.util.Optional;

import static org.hamcrest.CoreMatchers.containsString;
import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

public class CarTest {

    private static LoginPage loginPage;
    private static CarPage carPage;
    private static AddCarPage addCarPage;
    private static AddAttributeCarPage addAttributeCarPage;

    private static AddImagesCarPage addImagesCarPage;

    private static CarsPage carsPage;

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
        //carPage = new CarPage(driver);
        addCarPage = new AddCarPage(driver);
        carsPage = new CarsPage(driver);
    }

    @AfterClass
    public static void closeTheBrowser() {
        loginPage.close();
    }

    @Test
    public void testCreateCar() {
        String email = loginPage.insertEmail("emp@gmail.com");
        assertThat(email,is("emp@gmail.com"));
        String pass = loginPage.insertPassword("616944");
        assertThat(pass,is("616944"));
        loginPage.clickLoginAndWait();
        assertThat(driver.getCurrentUrl(),is("http://localhost:3000/"));

        addCarPage.open("http://localhost:3000/manage-car/car");

        String randomName = RandomStringGenerator.generateRandomString(10);

        String carname = addCarPage.insertName(randomName);
        assertThat(carname, is(randomName));

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

        String stockQuantity = addCarPage.insertStockQuantity("15");
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

        addImagesCarPage.clickSubmit();

        carsPage.open("http://localhost:3000/manage-car");

        Optional<WebElement> carItemOptional = carsPage.getCarItem(randomName);
        if(carItemOptional.isPresent()) {
            WebElement carItem = carItemOptional.get();
            assertThat(carItem.isDisplayed(), is(true));
            assertThat(carsPage.getName(carItem), containsString(randomName));
        }
    }

    @Test
    public void testGetListCar() {
        String email = loginPage.insertEmail("emp@gmail.com");
        assertThat(email, is("emp@gmail.com"));
        String pass = loginPage.insertPassword("616944");
        assertThat(pass, is("616944"));
        loginPage.clickLoginAndWait();
        assertThat(driver.getCurrentUrl(), is("http://localhost:3000/"));

        addCarPage.open("http://localhost:3000/manage-car/car");
        String randomName = RandomStringGenerator.generateRandomString(10);
        String carname = addCarPage.insertName(randomName);
        assertThat(carname, is(randomName));

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

        String stockQuantity = addCarPage.insertStockQuantity("15");
        assertThat(stockQuantity, is("15"));
        try {
            Thread.sleep(1000);
        } catch (Exception e) {

        }
        addAttributeCarPage = addCarPage.clickSubmit();

        addImagesCarPage = addAttributeCarPage.clickSubmit();

        addImagesCarPage.clickSubmit();

        carsPage.open("http://localhost:3000/manage-car");

        Optional<WebElement> carItemOptional = carsPage.getCarItem(randomName);
        if (carItemOptional.isPresent()) {
            WebElement carItem = carItemOptional.get();
            assertThat(carItem.isDisplayed(), is(true));
            assertThat(carsPage.getName(carItem), containsString(randomName));
        }
    }

    @Test
    public void testUpdateCar() {
        String email = loginPage.insertEmail("emp@gmail.com");
        assertThat(email,is("emp@gmail.com"));
        String pass = loginPage.insertPassword("616944");
        assertThat(pass,is("616944"));
        loginPage.clickLoginAndWait();
        assertThat(driver.getCurrentUrl(),is("http://localhost:3000/"));


        //Add car
        addCarPage.open("http://localhost:3000/manage-car/car");
        String randomName = RandomStringGenerator.generateRandomString(10);
        String carname = addCarPage.insertName(randomName);
        assertThat(carname, is(randomName));

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

        String stockQuantity = addCarPage.insertStockQuantity("15");
        assertThat(stockQuantity, is("15"));
        try{
            Thread.sleep(1000);
        }
        catch (Exception e) {

        }
        addAttributeCarPage = addCarPage.clickSubmit();

        addImagesCarPage = addAttributeCarPage.clickSubmit();

        addImagesCarPage.clickSubmit();
        try{
            Thread.sleep(1000);
        }
        catch (Exception e) {

        }
        carsPage.open("http://localhost:3000/manage-car");

        String productNumber = "";
        Optional<WebElement> carItemOptional = carsPage.getCarItem(randomName);
        if (carItemOptional.isPresent()) {
            WebElement carItem = carItemOptional.get();
            assertThat(carItem.isDisplayed(), is(true));
            assertThat(carsPage.getName(carItem), containsString(randomName));
            productNumber = carsPage.getProductNumber(carItem);
        }

        String url = "http://localhost:3000/manage-car/car/" + productNumber;
        addCarPage.open(url);

        basePrice = addCarPage.insertBasePrice("65000");
        assertThat(basePrice, is("65000"));

        year = addCarPage.insertYear("2013");
        assertThat(year, is("2013"));

        stockQuantity = addCarPage.insertStockQuantity("19");
        assertThat(stockQuantity, is("19"));
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
        try{
            Thread.sleep(1000);
        }
        catch (Exception e) {

        }
        addImagesCarPage.clickSubmit();

        url = "http://localhost:3000/cars/" + productNumber;
        carPage = new CarPage(driver);
        carPage.open(url);
        String title = carPage.getCarName();
        assertThat(title, is(randomName));
    }

    @Test
    public void testDeleteCar(){
        String email = loginPage.insertEmail("emp@gmail.com");
        assertThat(email,is("emp@gmail.com"));
        String pass = loginPage.insertPassword("616944");
        assertThat(pass,is("616944"));
        loginPage.clickLoginAndWait();
        assertThat(driver.getCurrentUrl(),is("http://localhost:3000/"));

        addCarPage.open("http://localhost:3000/manage-car/car");

        String randomName = RandomStringGenerator.generateRandomString(10);
        String carname = addCarPage.insertName(randomName);
        assertThat(carname, is(randomName));

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

        String stockQuantity = addCarPage.insertStockQuantity("15");
        assertThat(stockQuantity, is("15"));
        try{
            Thread.sleep(1000);
        }
        catch (Exception e) {

        }
        addAttributeCarPage = addCarPage.clickSubmit();

        addImagesCarPage = addAttributeCarPage.clickSubmit();

        addImagesCarPage.clickSubmit();
        try{
            Thread.sleep(1000);
        }
        catch (Exception e) {

        }
        String url = driver.getCurrentUrl();
        String productNumber = url.replace("http://localhost:3000/cars/","");
        System.out.println(url);
        System.out.println(productNumber);
        carsPage.open("http://localhost:3000/manage-car");

        Optional<WebElement> carItemOptional = carsPage.getCarItem(randomName);
        if(carItemOptional.isPresent()) {
            WebElement carItem = carItemOptional.get();
            assertThat(carItem.isDisplayed(), is(true));
            assertThat(carsPage.getName(carItem), containsString(randomName));

            carsPage.clickDeleteButton(productNumber);
            try{
                Thread.sleep(1000);
            }
            catch (Exception e) {

            }
            carItemOptional = carsPage.getCarItem(randomName);
            assertThat(carItemOptional.isPresent(), is(false));
            }
    }

    @Test
    public void testGetCar() {
        carPage = new CarPage(driver);
        carPage.open("http://localhost:3000/cars/37b8734b-8e40-4bf7-bc60-2cbcfa844d89");
        String title = carPage.getCarName();
        assertThat(title, is ("2024 TOYOTA GR COROLLA"));
    }

    @Test
    public void testCreateCarFailWithNullPrice() {
        String email = loginPage.insertEmail("emp@gmail.com");
        assertThat(email,is("emp@gmail.com"));
        String pass = loginPage.insertPassword("616944");
        assertThat(pass,is("616944"));
        loginPage.clickLoginAndWait();
        assertThat(driver.getCurrentUrl(),is("http://localhost:3000/"));

        addCarPage.open("http://localhost:3000/manage-car/car");

        String randomName = RandomStringGenerator.generateRandomString(10);

        String carname = addCarPage.insertName(randomName);
        assertThat(carname, is(randomName));

        String description = addCarPage.insertDescription("VinFast is a leading Vietnamese electric car manufacturer that promises to bring affordable & luxury electric cars with powerful engines");
        assertThat(description, is("VinFast is a leading Vietnamese electric car manufacturer that promises to bring affordable & luxury electric cars with powerful engines"));

        String year = addCarPage.insertYear("2023");
        assertThat(year, is("2023"));

        String model = addCarPage.insertModel("Luxury");
        assertThat(model, is("Luxury"));

        String make = addCarPage.insertMake("Vinfast");
        assertThat(make, is("Vinfast"));

        String stockQuantity = addCarPage.insertStockQuantity("15");
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

        String url = driver.getCurrentUrl();
        assertThat(url, is("http://localhost:3000/manage-car/car"));
    }

    @Test
    public void testCreateCarFailWIthNonePermissionUser() {
        String email = loginPage.insertEmail("emp@gmail.com");
        assertThat(email,is("emp@gmail.com"));
        String pass = loginPage.insertPassword("616944");
        assertThat(pass,is("616944"));
        loginPage.clickLoginAndWait();
        assertThat(driver.getCurrentUrl(),is("http://localhost:3000/"));

        addCarPage.open("http://localhost:3000/manage-car/car");

        String randomName = RandomStringGenerator.generateRandomString(10);

        String carname = addCarPage.insertName(randomName);
        assertThat(carname, is(randomName));

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

        String stockQuantity = addCarPage.insertStockQuantity("15");
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

        addImagesCarPage.clickSubmit();

        assertThat(driver.getCurrentUrl(),is("http://localhost:3000/manage-car/car/images"));
    }
}