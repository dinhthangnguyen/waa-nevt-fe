package withpageobject;

import org.openqa.selenium.TimeoutException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public class CheckoutConfirmPage {
	protected WebDriver driver;

	public CheckoutConfirmPage(WebDriver driver) {
		this.driver = driver;
		PageFactory.initElements(driver,this);
	}


	public void open(String url) {
		driver.get(url);
	}

	public void close() {
		driver.close();
	}

	@FindBy(id = "confirmTitle")
	private WebElement confirmTitle;

	@FindBy(id = "checkoutAddressSubtitle")
	private WebElement checkoutAddressSubtitle;

	@FindBy(id = "checkoutCardSubtitle")
	private WebElement checkoutCardSubtitle;

	/// address
	@FindBy(id = "checkoutAddressName")
	private WebElement checkoutAddressName;
	@FindBy(id = "checkoutAddressPhone")
	private WebElement checkoutAddressPhone;
	@FindBy(id = "checkoutAddressEmail")
	private WebElement checkoutAddressEmail;
	@FindBy(id = "checkoutAddressFull")
	private WebElement checkoutAddressFull;

	// card
	@FindBy(id = "checkoutNumber")
	private WebElement checkoutCardNumber;
	@FindBy(id = "checkoutCardType")
	private WebElement checkoutCardType;
	@FindBy(id = "checkoutValidCode")
	private WebElement checkoutValidCode;
	@FindBy(id = "checkoutValidDate")
	private WebElement checkoutValidDate;

	@FindBy(id = "checkoutTotal")
	private WebElement totalElement;

	@FindBy(id = "checkoutButton")
	private WebElement checkoutButton;


	public String getTitle() {
		return confirmTitle.getText();
	}

	public String getTotalPrice() {
		return totalElement.getText();
	}

	public String getAddressTitle() {
		return checkoutAddressSubtitle.getText();
	}

	public String getName() {
		return checkoutAddressName.getText();
	}

	public String getPhone() {
		return checkoutAddressPhone.getText();
	}
	public String getEmail() {
		return checkoutAddressEmail.getText();
	}
	public String getAddressFull() {
		return checkoutAddressFull.getText();
	}
	public String getCardNumber() {
		return checkoutCardNumber.getText();
	}
	public String getCardType() {
		return checkoutCardType.getText();
	}
	public String getValidCode() {
		return checkoutValidCode.getText();
	}

	public String getValidDate() {
		return checkoutValidDate.getText();
	}

	public OrderPage clickCheckout() {
		System.out.println("isDisplay: "+ checkoutButton.isDisplayed());
		checkoutButton.click();

		WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
		try {
			wait
			wait.until(ExpectedConditions.elementToBeClickable(checkoutButton));
			wait.until(ExpectedConditions.urlToBe("http://localhost:3000/orders"));
			System.out.println("URL matched successfully: " + driver.getCurrentUrl());
		} catch (TimeoutException e) {
			System.err.println("Timeout waiting for URL to match. Current URL: " + driver.getCurrentUrl());
			e.printStackTrace();
		}

		return new OrderPage(driver);
	}
}
