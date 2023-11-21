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

public class OrderTest {

	private static LoginPage loginPage;
	private static CarPage carPage;
	private static CartPage cartPage;
	private static AddressPage addressPage;

	private static CardPage cardPage;

	private static CheckoutConfirmPage confirmPage;

	private static OrderPage orderPage;
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
	public void testWholeCreateOrderFlow()  {
		String email = loginPage.insertEmail("dnguyen@miu.edu");
		assertThat(email,is("dnguyen@miu.edu"));
		String pass = loginPage.insertPassword("Qwe123");
		assertThat(pass,is("Qwe123"));
		loginPage.clickLoginAndWait();
		assertThat(driver.getCurrentUrl(),is("http://localhost:3000/"));

		carPage.open("http://localhost:3000/cars/b8f29c31-6f79-4cc4-b939-f5048d4a4f3c");
		assertThat(carPage.getCarName(),is("TESLA MODEL 3"));
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
		addressPage.insertPhone("6412339666");

		// move to card pay
		cardPage = addressPage.clickNext();
		assertThat(cardPage.getTitle(),is("PLEASE PROVIDE YOUR CARD"));

		cardPage.insertNumber("1234567890");
		cardPage.insertCVV("333");
		cardPage.insertDate("05/2025");
		cardPage.selectVisa();

		// move to confirm page
		confirmPage = cardPage.clickNext();
		assertThat(confirmPage.getTitle(),is("CHECKOUT CONFIRMATION"));
		assertThat(confirmPage.getTotalPrice(),containsString(price));
		assertThat(confirmPage.getAddressTitle(),is("Address"));
		assertThat(confirmPage.getName(),containsString("Dinh Thang Nguyen"));
		assertThat(confirmPage.getEmail(),containsString("dnguyen@miu.edu"));
		assertThat(confirmPage.getPhone(),containsString("6412339666"));
		assertThat(confirmPage.getAddressFull(),containsString("1000 N 4th Street Fairfield 52557"));
		assertThat(confirmPage.getCardNumber(),containsString("1234567890"));
		assertThat(confirmPage.getCardType(),containsString("VISA"));
		assertThat(confirmPage.getValidCode(),containsString("333"));
		assertThat(confirmPage.getValidDate(),containsString("05/2025"));

		// move to order list
		orderPage = confirmPage.clickCheckout();
		assertThat(driver.getCurrentUrl(),is("http://localhost:3000/orders"));
		assertThat(orderPage.getTitle(),is("ORDERS"));

		WebElement orderItem = orderPage.getOrderItem(price);
		assertThat(orderItem.isDisplayed(),is(true));
		assertThat(orderPage.getTotal(orderItem),containsString(price));
		assertThat(orderPage.getAddress(orderItem),containsString("1000 N 4th Street Fairfield 52557"));
		assertThat(orderPage.getName(orderItem),containsString("Dinh Thang Nguyen"));
		assertThat(orderPage.getPhone(orderItem),containsString("6412339666"));
		assertThat(orderPage.getEmail(orderItem),containsString("dnguyen@miu.edu"));
		assertThat(orderPage.getCardType(orderItem),containsString("VISA"));
		// there should be one car => TESLA MODEL 3
		WebElement titleOfCarElement = orderPage.getCartItem("TESLA MODEL 3");
		assertThat(titleOfCarElement.isDisplayed(),is(true));
		assertThat(titleOfCarElement.getText(),containsString("TESLA MODEL 3"));
	}


}