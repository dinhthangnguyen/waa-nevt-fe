package withpageobject.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.TimeoutException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.*;
import org.openqa.selenium.JavascriptExecutor;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;

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

	@FindBy(id="carName")
	private WebElement carName;

	@FindBy(id = "total")
	private WebElement totalElement;

	@FindBy(id = "car-review-comment")
	private WebElement reviewComment;

	@FindBy(id = "add-review")
	private WebElement addReview;

	@FindBy(id = "review-table")
	private WebElement reviewTable;

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

	public String getCarName() {
		return carName.getText();
	}


	public CartPage clickAddToCart() {
		button.click();
		return new CartPage(driver);
	}

	public String enterReview(String text){
		try
		{
			reviewComment.sendKeys(text);
		}
		catch (Exception e) {
			e.printStackTrace();
		}

		return reviewComment.getText();
	}

	public void clickAddReview(){
		try
		{
			addReview.click();
		}
		catch (Exception e) {
			e.printStackTrace();
		}
	}
	public boolean checkExistedReviewTable() {
		return reviewTable != null;
	}

	public boolean checkExistedYourReview() {
		return !reviewComment.getText().isEmpty();
	}
}
