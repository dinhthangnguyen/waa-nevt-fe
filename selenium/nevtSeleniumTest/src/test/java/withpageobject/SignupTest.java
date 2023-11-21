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

import java.util.Random;

import static org.hamcrest.CoreMatchers.containsString;
import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

public class SignupTest {


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
		signupPage = new SignupPage(driver);
		signupPage.open("http://localhost:3000/signup");
	}

	@AfterClass
	public static void closeTheBrowser() {
		signupPage.close();
	}

	protected String getSaltString() {
		String SALTCHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		StringBuilder salt = new StringBuilder();
		Random rnd = new Random();
		while (salt.length() < 10) { // length of the random string.
			int index = (int) (rnd.nextFloat() * SALTCHARS.length());
			salt.append(SALTCHARS.charAt(index));
		}
		String saltStr = salt.toString();
		return saltStr;

	}

	@Test
	public void signup()  {
		String firstName = signupPage.insertFirstname("Dinh Thang");
		assertThat(firstName,is("Dinh Thang"));
		String lastName = signupPage.insertLastName("Nguyen");
		assertThat(lastName,is("Nguyen"));

		String e = getSaltString().toLowerCase() + "@gmail.com".toLowerCase();
		System.out.println(e);
		String email = signupPage.insertEmail(e);
		assertThat(email,is(e));

		String pass = signupPage.insertPassword("Qwe123");
		assertThat(pass,is("Qwe123"));

		homePage = signupPage.clickLoginAndWait();
		assertThat(homePage.getHeaderTitle(),containsString("TODAY'S PICK"));
	}

}