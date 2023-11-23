package withpageobject.pages;

import org.openqa.selenium.*;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;
import java.util.List;
import java.util.Optional;
import java.util.function.Predicate;

public class CarsPage {
	protected WebDriver driver;

	public CarsPage(WebDriver driver) {
		this.driver = driver;
		PageFactory.initElements(driver,this);
	}


	public void open(String url) {
		driver.get(url);
	}

	public void close() {
		driver.close();
	}

	public Optional<WebElement> getCarItem (String carName) {
		List<WebElement> allCars = driver.findElements(By.id("carItem"));
		System.out.println("cars: "+ allCars.size());
		return allCars.stream().filter(new Predicate<WebElement>() {
			@Override
			public boolean test(WebElement webElement) {
				WebElement totalElement = webElement.findElement(By.name("car-name"));
				if (totalElement.getText().contains(carName)) {
					return true;
				}
				return false;
			}
		}).findFirst();
	}

	public String getName (WebElement element) {
		WebElement nameElement = element.findElement(By.name("car-name"));
		return nameElement.getText();
	}

	public AddCarPage clickEditButton (WebElement element) {
		WebElement editButton = element.findElement(By.id("edit-button"));
		WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
		try {
			wait.until(ExpectedConditions.and(
					ExpectedConditions.visibilityOf(editButton),
					ExpectedConditions.elementToBeClickable(editButton)
			));
			editButton.click();
			return new AddCarPage(driver);
		} catch (TimeoutException e) {
			System.err.println("Timeout waiting for URL to match. Current URL: " + driver.getCurrentUrl());
			return null;
		}
	}

	public void clickDeleteButton (String productNumber) {
		WebElement delete = driver.findElement(By.id("delete-button-" + productNumber));

		// Scroll the element into view


		// Wait for the element to be clickable and visible
		WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
		wait.until(ExpectedConditions.and(
				ExpectedConditions.visibilityOf(delete),
				ExpectedConditions.elementToBeClickable(delete)
		));
		((JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView(true);", delete);
		// Click the delete button
		((JavascriptExecutor) driver).executeScript("arguments[0].click();", delete);
	}

	public String getProductNumber (WebElement element) {
		WebElement editButton = element.findElement(By.id("edit-button"));
		return editButton.getAttribute("value");
	}
}
