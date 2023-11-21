package withpageobject;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.FluentWait;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.Wait;

import java.time.Duration;
import java.util.NoSuchElementException;

public class HomePage {
	protected WebDriver driver;

	public HomePage(WebDriver driver) {
		this.driver = driver;
		PageFactory.initElements(driver,this);
	}

	@FindBy(id = "collection-title")
	private WebElement collectionTitleH2;


	public String getHeaderTitle() {
		return collectionTitleH2.getText();
	}
	public String getNavbarName() {
		Wait<WebDriver> wait = new FluentWait<>(driver)
				.withTimeout(Duration.ofSeconds(3))
				.pollingEvery(Duration.ofSeconds(1))
				.ignoring(NoSuchElementException.class);
		WebElement nameDropdown = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("name-dropdown")));

		return nameDropdown.getText();
	}

	public void open(String url) {
		driver.get(url);
	}

	public void close() {
		driver.close();
	}

}
