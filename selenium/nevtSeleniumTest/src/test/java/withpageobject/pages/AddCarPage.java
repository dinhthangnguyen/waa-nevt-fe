package withpageobject.pages;

import com.beust.ah.A;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;
import java.util.List;
import java.util.Optional;
import java.util.function.Predicate;

public class AddCarPage {
	protected WebDriver driver;

	public AddCarPage(WebDriver driver) {
		this.driver = driver;
		PageFactory.initElements(driver,this);
	}


	public void open(String url) {
		driver.get(url);
	}

	public void close() {
		driver.close();
	}

	@FindBy(id = "formBasicName")
	private WebElement nameInput;

	@FindBy(id = "formBasicBasePrice")
	private WebElement basePriceInput;

	@FindBy(id = "formBasicDescription")
	private WebElement descriptionInput;

	@FindBy(id = "formBasicYear")
	private WebElement yearInput;

	@FindBy(id = "formBasicModel")
	private WebElement modelInput;

	@FindBy(id = "formBasicMake")
	private WebElement makeInput;

	@FindBy(id = "formBasicStockQuantity")
	private WebElement stockQuantityInput;

	public String insertName(String string) {
		nameInput.clear();
		nameInput.sendKeys(string);
		return nameInput.getAttribute("value");
	}

	public String insertBasePrice(String string) {
		basePriceInput.clear();
		basePriceInput.sendKeys(string);
		return basePriceInput.getAttribute("value");
	}

	public String insertDescription(String string) {
		descriptionInput.clear();
		descriptionInput.sendKeys(string);
		return descriptionInput.getAttribute("value");
	}

	public String insertYear(String string) {
		yearInput.clear();
		yearInput.sendKeys(string);
		return yearInput.getAttribute("value");
	}

	public String insertModel(String string) {
		modelInput.clear();
		modelInput.sendKeys(string);
		return modelInput.getAttribute("value");
	}

	public String insertMake(String string) {
		makeInput.clear();
		makeInput.sendKeys(string);
		return makeInput.getAttribute("value");
	}

	public String insertStockQuantity(String string) {
		stockQuantityInput.clear();
		stockQuantityInput.sendKeys(string);
		return stockQuantityInput.getAttribute("value");
	}

	public AddAttributeCarPage clickSubmit() {
		WebElement submitButton = driver.findElement(By.id("submit-general"));

		((JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView(true);", submitButton);

		// Wait for the element to be clickable and visible
		WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
		wait.until(ExpectedConditions.and(
				ExpectedConditions.visibilityOf(submitButton),
				ExpectedConditions.elementToBeClickable(submitButton)
		));

		// Click the delete button
		((JavascriptExecutor) driver).executeScript("arguments[0].click();", submitButton);
		return new AddAttributeCarPage(driver);
	}

}
