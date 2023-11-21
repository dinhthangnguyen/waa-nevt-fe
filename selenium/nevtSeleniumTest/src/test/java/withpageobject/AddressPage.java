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

public class AddressPage {
	protected WebDriver driver;

	public AddressPage(WebDriver driver) {
		this.driver = driver;
		PageFactory.initElements(driver,this);
	}

	@FindBy(id = "addressTitle")
	private WebElement addressTitle;

	@FindBy(name = "name")
	private WebElement nameInput;

	@FindBy(name = "email")
	private WebElement emailInput;

	@FindBy(name = "phone")
	private WebElement phoneInput;

	@FindBy(name = "street")
	private WebElement streetInput;

	@FindBy(name = "city")
	private WebElement cityInput;

	@FindBy(name = "zip")
	private WebElement zipInput;

	@FindBy(id = "add-card")
	private WebElement addCardButton;

	public void open(String url) {
		driver.get(url);
	}

	public void close() {
		driver.close();
	}

	public String getAddressTitle() {
		return addressTitle.getText();
	}

	public String insertName(String string) {
		nameInput.sendKeys(string);
		return nameInput.getAttribute("value");
	}

	public String clearName() {
		nameInput.clear();
		return nameInput.getAttribute("value");
	}
	public String insertEmail(String string) {
		emailInput.sendKeys(string);
		return emailInput.getAttribute("value");
	}

	public String clearEmail() {
		emailInput.clear();
		return emailInput.getAttribute("value");
	}
	public String insertPhone(String string) {
		phoneInput.sendKeys(string);
		return phoneInput.getAttribute("value");
	}
	public String insertStreet(String string) {
		streetInput.sendKeys(string);
		return streetInput.getAttribute("value");
	}

	public String insertCity(String string) {
		cityInput.sendKeys(string);
		return cityInput.getAttribute("value");
	}
	public String insertZip(String string) {
		zipInput.sendKeys(string);
		return zipInput.getAttribute("value");
	}


	public CardPage clickNext() {
		addCardButton.click();
		return new CardPage(driver);
	}
}
