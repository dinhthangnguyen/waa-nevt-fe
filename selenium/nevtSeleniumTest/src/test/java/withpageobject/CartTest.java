package withpageobject;

import org.junit.AfterClass;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.TimeoutException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;
import java.util.Arrays;

import static org.hamcrest.CoreMatchers.containsString;
import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

public class CartTest {

	private static LoginPage loginPage;
	private static CarPage carPage;
	private static CartPage cartPage;
	private static AddressPage addressPage;

	private static CardPage cardPage;
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
	}

	@AfterClass
	public static void closeTheBrowser() {
		loginPage.close();
	}

	@Test
	public void testCartFlow()  {
		String email = loginPage.insertEmail("dnguyen@miu.edu");
		assertThat(email,is("dnguyen@miu.edu"));
		String pass = loginPage.insertPassword("Qwe123");
		assertThat(pass,is("Qwe123"));
		loginPage.clickLoginAndWait();
		assertThat(driver.getCurrentUrl(),is("http://localhost:3000/"));

		carPage.open("http://localhost:3000/cars/b8f29c31-6f79-4cc4-b939-f5048d4a4f3c");
		String selected = carPage.selectState("1");
		assertThat(selected,is("1"));
		try {
			Thread.sleep(1000);
		} catch (InterruptedException e) {
			throw new RuntimeException(e);
		}

		// move to cart
		String price = carPage.getTotalPrice().substring(14);
		cartPage = carPage.clickAddToCart();
		assertThat(cartPage.getTitle(),is("SHOPPING CART"));
		assertThat(cartPage.getTotalPrice(),containsString(price));

		// move to address page
		addressPage = cartPage.clickAddress();
		assertThat(addressPage.getAddressTitle(),is("FILL IN YOUR INFO"));
		addressPage.clearName();
		String name = addressPage.insertName("Dinh Thang Nguyen");
		assertThat(name,is("Dinh Thang Nguyen"));
		addressPage.clearEmail();
		addressPage.insertEmail("dnguyen@miu.edu");
		addressPage.insertStreet("1000 N 4th Street");
		addressPage.insertCity("Fairfield");
		addressPage.insertZip("52557");
		addressPage.insertPhone("123456789");

		// move to card pay
		cardPage = addressPage.clickNext();
		assertThat(cardPage.getTitle(),is("PLEASE PROVIDE YOUR CARD"));

		cardPage.insertNumber("1234567890");
		cardPage.insertCVV("333");
		cardPage.insertDate("05/2025");
		cardPage.selectVisa();
		

	}


}