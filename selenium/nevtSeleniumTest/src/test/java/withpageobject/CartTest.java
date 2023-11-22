package withpageobject;

import org.junit.AfterClass;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import withpageobject.pages.*;

import java.util.Optional;

import static org.hamcrest.CoreMatchers.containsString;
import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

public class CartTest {

	private static LoginPage loginPage;
	private static CarPage carPage;
	private static CartPage cartPage;



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
	public void testAddAndDeleteCartItem()  {
		String email = loginPage.insertEmail("dnguyen@miu.edu");
		assertThat(email,is("dnguyen@miu.edu"));
		String pass = loginPage.insertPassword("616940");
		assertThat(pass,is("616940"));
		loginPage.clickLoginAndWait();
		assertThat(driver.getCurrentUrl(),is("http://localhost:3000/"));

		carPage.open("http://localhost:3000/cars/7d5c611a-6121-442b-a179-00984737bcdd");
		assertThat(carPage.getCarName(),is("2024 TOYOTA PRIUS PRIME"));
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

		Optional<WebElement> optional = cartPage.getCartItem("2024 TOYOTA PRIUS PRIME");
		assertThat(optional.get().isDisplayed(),is(true));
		assertThat(optional.get().getText(),containsString("2024 TOYOTA PRIUS PRIME"));

		cartPage.deleteCartItem("2024 TOYOTA PRIUS PRIME");
		 optional = cartPage.getCartItem("2024 TOYOTA PRIUS PRIME");
		assertThat(optional.isEmpty(),is(true));
		assertThat(cartPage.getTitle(),is("NO CART ITEMS"));
	}

	@Test
	public void testChangeQuantityCartItem()  {
		String email = loginPage.insertEmail("dnguyen@miu.edu");
		assertThat(email,is("dnguyen@miu.edu"));
		String pass = loginPage.insertPassword("616940");
		assertThat(pass,is("616940"));
		loginPage.clickLoginAndWait();
		assertThat(driver.getCurrentUrl(),is("http://localhost:3000/"));

		carPage.open("http://localhost:3000/cars/878f1dda-08f1-4477-9f32-873b59b1a45f");
		assertThat(carPage.getCarName(),is("TESLA MODEL X"));
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


		Optional<WebElement> optional = cartPage.getCartItem("TESLA MODEL X");
		assertThat(optional.get().isDisplayed(),is(true));
		assertThat(optional.get().getText(),containsString("TESLA MODEL X"));

		String quantity = cartPage.changeQuantityOf("TESLA MODEL X","2");
		assertThat(quantity,is("2"));
		String price2 = carPage.getTotalPrice().substring(14);

		assertThat(price2,is(String.valueOf(Integer.parseInt(price)*2)));



	}


}