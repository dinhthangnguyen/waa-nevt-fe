package withpageobject;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.*;

import java.time.Duration;
import java.util.NoSuchElementException;
import java.util.concurrent.TimeUnit;

public class CarPage {
	protected WebDriver driver;

	public CarPage(WebDriver driver) {
		this.driver = driver;
		PageFactory.initElements(driver,this);
	}


	public void open(String url) {
		driver.get(url);
	}

	public void close() {
		driver.close();
	}

	@FindBy(id = "addCartButton")
	private WebElement button;

	@FindBy(id = "carSelect")
	private WebElement select;

	@FindBy(id = "total")
	private WebElement totalElement;

	private Select dropdown() {
		return new Select(select);
	}

	public String selectState(String state) {
		Select dropdown = dropdown();
		dropdown.selectByVisibleText(state);
		return dropdown.getFirstSelectedOption().getText();
	}
	public String getTotalPrice() {
		return totalElement.getText();
	}

	public CartPage clickAddToCart() {
		button.click();
		return new CartPage(driver);
	}
}
