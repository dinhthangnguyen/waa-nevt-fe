package withpageobject.pages;

import org.openqa.selenium.*;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public class AddImagesCarPage {
	protected WebDriver driver;

	public AddImagesCarPage(WebDriver driver) {
		this.driver = driver;
		PageFactory.initElements(driver,this);
	}

	public CarPage clickSubmit() {
		WebElement submitButton = driver.findElement(By.id("submit-image"));
		((JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView(true);", submitButton);

		// Wait for the element to be clickable and visible
		WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
		wait.until(ExpectedConditions.and(
				ExpectedConditions.visibilityOf(submitButton),
				ExpectedConditions.elementToBeClickable(submitButton)
		));

		// Click the delete button
		((JavascriptExecutor) driver).executeScript("arguments[0].click();", submitButton);
		return new CarPage(driver);
	}

}
