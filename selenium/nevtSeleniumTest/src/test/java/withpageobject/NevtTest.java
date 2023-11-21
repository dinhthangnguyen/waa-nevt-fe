package withpageobject;

import org.junit.AfterClass;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.FluentWait;
import org.openqa.selenium.support.ui.Wait;

import java.time.Duration;
import java.util.NoSuchElementException;
import java.util.concurrent.TimeUnit;

import static org.hamcrest.CoreMatchers.containsString;
import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

public class NevtTest {

	private static LoginPage loginPage;
	private static HomePage homePage;
	private static Page3 page3;
	private static Page4 page4;

	@Before
	public void createWebDriver() {
		// set path to chromedriver.exe
		System.setProperty("webdriver.chrome.driver", "/Users/thangnguyen/Desktop/WAA/lab/lab13/chromedriver-mac-arm64/chromedriver");
		ChromeOptions options = new ChromeOptions();
		options.setBinary("/Users/thangnguyen/Desktop/WAA/lab/lab13/chrome-headless-shell-mac-arm64/chrome-headless-shell");
		options.addArguments("--remote-allow-origins=*");
		// create chrome instance
		WebDriver driver = new ChromeDriver(options);
		loginPage = new LoginPage(driver);
		loginPage.open("http://localhost:3000/login");
	}

	@AfterClass
	public static void closeTheBrowser() {
		loginPage.close();
	}

	@Test
	public void testLogin()  {
		String email = loginPage.insertEmail("admin@gmail.com");
		assertThat(email,is("admin@gmail.com"));
		String pass = loginPage.insertPassword("qwe123");
		assertThat(pass,is("qwe123"));
		homePage = loginPage.clickLoginAndWait();
		assertThat(homePage.getHeaderTitle(),containsString("TODAY'S PICK"));
	}


//	@Test
//	public void testPages() {
//		page.insertFirstName("Dinh Thang");
//		page.insertLastName("Nguyen");
//		page.selectProfession(3);
//		homePage = page.clickNext();
//
//		assertThat(homePage.getFirstname().trim(),containsString("Dinh Thang"));
//		assertThat(homePage.getLastName().trim(),containsString("Nguyen"));
//		assertThat(homePage.getProfession().trim(),containsString("Developer"));
//
//		homePage.insertStreet("E Adams Ave");
//		homePage.insertCity("Fairfield");
//		homePage.insertZip("52556");
//		homePage.selectState("IOWA");
//		page3 = homePage.clickNext();
//
//
//		assertThat(page3.getFirstname().trim(),containsString("Dinh Thang"));
//		assertThat(page3.getLastName().trim(),containsString("Nguyen"));
//		assertThat(page3.getProfession().trim(),containsString("Developer"));
//		assertThat(page3.getStreet().trim(),containsString("E Adams Ave"));
//		assertThat(page3.getCity().trim(),containsString("Fairfield"));
//		assertThat(page3.getZip().trim(),containsString("52556"));
//		assertThat(page3.getState().trim(),containsString("IOWA"));
//
//		page3.insertCard("123456789");
//		page3.selectCardType(false);
//		page4 = page3.clickNext();
//
//		assertThat(page4.getFirstname().trim(),containsString("Dinh Thang"));
//		assertThat(page4.getLastName().trim(),containsString("Nguyen"));
//		assertThat(page4.getProfession().trim(),containsString("Developer"));
//		assertThat(page4.getStreet().trim(),containsString("E Adams Ave"));
//		assertThat(page4.getCity().trim(),containsString("Fairfield"));
//		assertThat(page4.getZip().trim(),containsString("52556"));
//		assertThat(page4.getState().trim(),containsString("IOWA"));
//		assertThat(page4.getCard().trim(),containsString("123456789"));
//		assertThat(page4.getCardType().trim(),containsString("MASTERCARD"));
//	}
}