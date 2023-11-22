package withpageobject.pages;

import org.openqa.selenium.TimeoutException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
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


	@FindBy(id = "submit-image")
	private WebElement submitButton;

	public CarPage clickSubmit() {
		submitButton.click();
//		WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
//		try {
//			wait.until(ExpectedConditions.urlMatches("^http:\\/\\/localhost:3000\\/cars\\/[a-f\\d]{8}-[a-f\\d]{4}-[a-f\\d]{4}-[a-f\\d]{4}-[a-f\\d]{12}$\n"));
//			System.out.println("URL matched successfully: " + driver.getCurrentUrl());
//		} catch (TimeoutException e) {
//			System.err.println("Timeout waiting for URL to match. Current URL: " + driver.getCurrentUrl());
//			e.printStackTrace();
//		}
		String currentUrlBeforeSubmit = driver.getCurrentUrl();
		try{
			WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10)); // Adjust the timeout as needed
			wait.until(ExpectedConditions.not(ExpectedConditions.urlToBe(currentUrlBeforeSubmit)));
		} catch (Exception e){
			System.err.println("Timeout waiting for URL to match. Current URL: " + driver.getCurrentUrl());
			e.printStackTrace();
		}


		return new CarPage(driver);
	}

}
