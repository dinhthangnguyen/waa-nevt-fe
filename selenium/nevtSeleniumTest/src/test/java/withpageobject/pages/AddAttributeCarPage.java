package withpageobject.pages;

import org.openqa.selenium.TimeoutException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public class AddAttributeCarPage {
	protected WebDriver driver;

	public AddAttributeCarPage(WebDriver driver) {
		this.driver = driver;
		PageFactory.initElements(driver,this);
	}


	@FindBy(id = "submit-attribute")
	private WebElement submitButton;

	public AddImagesCarPage clickSubmit() {
		WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
		try {
			wait.until(ExpectedConditions.and(
					ExpectedConditions.visibilityOf(submitButton),
					ExpectedConditions.elementToBeClickable(submitButton)
			));
			submitButton.click();
			return new AddImagesCarPage(driver);
		} catch (TimeoutException e) {
			System.err.println("Timeout waiting for URL to match. Current URL: " + driver.getCurrentUrl());
			return null;
		}
    }
}
