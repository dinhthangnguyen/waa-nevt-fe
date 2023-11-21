package withpageobject.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindAll;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

import java.util.List;
import java.util.function.Predicate;

public class OrderPage {
	protected WebDriver driver;

	public OrderPage(WebDriver driver) {
		this.driver = driver;
		PageFactory.initElements(driver,this);
	}

	public void open(String url) {
		driver.get(url);
	}

	public void close() {
		driver.close();
	}

	@FindBy(id = "orderTitle")
	private WebElement orderTitle;

	public String getTitle() {
		return orderTitle.getText();
	}
	public WebElement getOrderItem (String total) {
		 List<WebElement> allOrderCells = driver.findElements(By.className("order-cell"));
		System.out.println("orders: "+ allOrderCells.size());
		return allOrderCells.stream().filter(new Predicate<WebElement>() {
			@Override
			public boolean test(WebElement webElement) {
				WebElement totalElement = webElement.findElement(By.name("orderTotal"));
				System.out.println(totalElement.isDisplayed());
				if (totalElement.getText().contains(total)) {
					return true;
				}
				return false;
			}
		}).findFirst().get();
	}

	public WebElement getCartItem (String carName) {
		List<WebElement> allOrderCells = driver.findElements(By.className("cartitem"));
		System.out.println("orders: "+ allOrderCells.size());
		return allOrderCells.stream().filter(new Predicate<WebElement>() {
			@Override
			public boolean test(WebElement webElement) {
				WebElement totalElement = webElement.findElement(By.name("cartTitle"));
				System.out.println(totalElement.isDisplayed());
				if (totalElement.getText().contains(carName)) {
					return true;
				}
				return false;
			}
		}).findFirst().get();
	}

	public String getTotal (WebElement element) {
		WebElement totalElement = element.findElement(By.name("orderTotal"));
		return totalElement.getText();
	}

	public String getName (WebElement element) {
		WebElement totalElement = element.findElement(By.name("orderCellName"));
		return totalElement.getText();
	}

	public String getAddress (WebElement element) {
		WebElement totalElement = element.findElement(By.name("orderCellAddress"));
		return totalElement.getText();
	}
	public String getPhone (WebElement element) {
		WebElement totalElement = element.findElement(By.name("orderCellPhone"));
		return totalElement.getText();
	}

	public String getEmail (WebElement element) {
		WebElement totalElement = element.findElement(By.name("orderCellEmail"));
		return totalElement.getText();
	}

	public String getCardType (WebElement element) {
		WebElement totalElement = element.findElement(By.name("orderCellCardType"));
		return totalElement.getText();
	}
}
