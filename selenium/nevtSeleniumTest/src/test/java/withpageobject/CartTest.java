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
		String email = loginPage.insertEmail("admin@gmail.com");
		assertThat(email,is("admin@gmail.com"));
		String pass = loginPage.insertPassword("qwe123");
		assertThat(pass,is("qwe123"));
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
	}


}