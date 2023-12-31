package withpageobject;

import org.junit.AfterClass;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import withpageobject.pages.HomePage;
import withpageobject.pages.LoginPage;
import withpageobject.pages.SignupPage;

import static org.hamcrest.CoreMatchers.containsString;
import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

public class LoginTest {

	private static LoginPage loginPage;

	private static SignupPage signupPage;

	private static HomePage homePage;


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
		String pass = loginPage.insertPassword("616940");
		assertThat(pass,is("616940"));
		homePage = loginPage.clickLoginAndWait();
		assertThat(homePage.getHeaderTitle(),containsString("TODAY'S PICK"));
	}


}