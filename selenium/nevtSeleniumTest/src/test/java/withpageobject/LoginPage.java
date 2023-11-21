package withpageobject;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.FluentWait;
import org.openqa.selenium.support.ui.Wait;

import java.time.Duration;
import java.util.NoSuchElementException;

public class LoginPage {
	protected WebDriver driver;

	public LoginPage(WebDriver driver) {
		this.driver = driver;
	}

	@FindBy(name = "email")
	private WebElement emailInput;

	@FindBy(name = "password")
	private WebElement passwordInput;


	@FindBy(id = "login")
	private WebElement loginButton;


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

	public HomePage clickLogin() throws InterruptedException {
		loginButton.click();
		Wait<WebDriver> wait = new FluentWait<>(driver)
				.withTimeout(Duration.ofSeconds(3))
				.pollingEvery(Duration.ofSeconds(1))
				.ignoring(NoSuchElementException.class);
		wait(1000);
		return new HomePage(driver);
	}


}
