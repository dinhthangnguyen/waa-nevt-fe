package withpageobject.pages;

import org.openqa.selenium.TimeoutException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public class SignupPage {
	protected WebDriver driver;

	public SignupPage(WebDriver driver) {
		this.driver = driver;
		PageFactory.initElements(driver,this);
	}

	@FindBy(name = "firstName")
	private WebElement firstNameInput;

	@FindBy(name = "lastName")
	private WebElement lastNameInput;

	@FindBy(name = "email")
	private WebElement emailInput;

	@FindBy(name = "password")
	private WebElement passwordInput;


	@FindBy(id = "signupButton")
	private WebElement signupButton;


	public void open(String url) {
		driver.get(url);
	}

	public void close() {
		driver.close();
	}


	public String insertEmail(String string) {
		emailInput.sendKeys(string);
		return emailInput.getAttribute("value");
	}

	public String insertPassword(String string) {
		passwordInput.sendKeys(string);
		return passwordInput.getAttribute("value");
	}


	public String insertFirstname(String string) {
		firstNameInput.sendKeys(string);
		return firstNameInput.getAttribute("value");
	}

	public String insertLastName(String string) {
		lastNameInput.sendKeys(string);
		return lastNameInput.getAttribute("value");
	}

	public HomePage clickLoginAndWait() {
		signupButton.click();
		WebDriverWait wait = new WebDriverWait(driver,Duration.ofSeconds(10));
		System.out.println(driver.getCurrentUrl());
		try {
			wait.until(ExpectedConditions.urlToBe("http://localhost:3000/"));
			System.out.println("URL matched successfully: " + driver.getCurrentUrl());
		} catch (TimeoutException e) {
			System.err.println("Timeout waiting for URL to match. Current URL: " + driver.getCurrentUrl());
			e.printStackTrace();
		}
		return new HomePage(driver);
	}


}
